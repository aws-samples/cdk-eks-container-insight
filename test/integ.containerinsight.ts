import { KubectlV24Layer } from '@aws-cdk/lambda-layer-kubectl-v24';
import { App, Stack, StackProps, Aws } from 'aws-cdk-lib';
import { Vpc } from 'aws-cdk-lib/aws-ec2';
import { Cluster, KubernetesVersion } from 'aws-cdk-lib/aws-eks';
import { ManagedPolicy, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

import { ContainerInsight, FargateSupportMode } from '../src';

class TestEKSStack extends Stack {

  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const vpc = new Vpc(this, 'testVPC', {
      natGateways: 1,
    });

    const clusterRole = new Role(this, 'clusterRole', {
      assumedBy: new ServicePrincipal('eks.amazonaws.com'),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName('AmazonEKSClusterPolicy'),
        ManagedPolicy.fromAwsManagedPolicyName('AmazonEKSVPCResourceController'),
      ],
    });

    const nodeRole = new Role(this, 'nodeRole', {
      assumedBy: new ServicePrincipal(`ec2.${Aws.URL_SUFFIX}`),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName('AmazonEKSWorkerNodePolicy'),
        ManagedPolicy.fromAwsManagedPolicyName('AmazonEKS_CNI_Policy'),
        ManagedPolicy.fromAwsManagedPolicyName('AmazonEC2ContainerRegistryReadOnly'),
      ],
    });

    const cluster = new Cluster(this, 'testCluster', {
      vpc: vpc,
      role: clusterRole,
      defaultCapacity: 0,
      version: KubernetesVersion.V1_24, // OCI HELM repo only supported by new version.
      kubectlLayer: new KubectlV24Layer(this, 'KubectlLayer'), // new Kubectl lambda layer
    });

    cluster.addNodegroupCapacity('default', {
      desiredSize: 3,
      nodeRole: nodeRole,
    });

    cluster.addFargateProfile('karpenter', {
      selectors: [
        {
          namespace: 'default',
        },
      ],
    });

    new ContainerInsight(this, 'testContainerInsight', {
      cluster: cluster,
      fargateSupportMode: FargateSupportMode.BOTH,
    });

    cluster.addManifest('defaultDeploy', {
      apiVersion: 'apps/v1',
      kind: 'Deployment',
      metadata: {
        name: 'inflate',
      },
      spec: {
        replicas: 8,
        selector: {
          matchLabels: {
            app: 'inflate',
          },
        },
        template: {
          metadata: {
            labels: {
              app: 'inflate',
            },
          },
          spec: {
            terminationGracePeriodSeconds: 0,
            containers: [{
              name: 'inflate',
              image: 'public.ecr.aws/eks-distro/kubernetes/pause:3.2',
            }],
          },
        },
      },
    });
  }
}

const app = new App();

new TestEKSStack(app, 'test', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

app.synth();