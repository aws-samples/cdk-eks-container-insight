import * as fs from 'fs';
import * as path from 'path';
import { Aws } from 'aws-cdk-lib';
import { Cluster } from 'aws-cdk-lib/aws-eks';
import { ManagedPolicy } from 'aws-cdk-lib/aws-iam';

import { Construct } from 'constructs';
import { parseAllDocuments } from 'yaml';

export enum FargateSupportMode {
  NO = 'NO',
  ONLY = 'ONLY',
  BOTH = 'BOTH',
}

export interface ContainerInsightProps {
  /**
   * The EKS Cluster to attach to
   */
  readonly cluster: Cluster;

  /**
   * The Kubernetes namespace to install ADOT to
   *
   * @default amazon-metrics
   */
  readonly adotNamespace?: string;

  /**
   * The Kubernetes namespace to install CloudWatch agent to
   *
   * @default - amazon-cloudwatch
   */
  readonly cloudwatchNamespace?: string;

  /**
   * Fargate support mode for NO/ONLY/BOTH
   *
   * @default - NO
   */
  readonly fargateSupportMode?: FargateSupportMode;

  /**
   * Fargate container insight namepsace
   *
   * @default - fargate-container-insights
   */
  readonly fargateNamespace?: string;
}

export class ContainerInsight extends Construct {

  public readonly cluster: Cluster;
  public readonly adotNamespace?: string;
  public readonly cloudwatchNamespace?: string;
  public readonly fargateSupportMode?: string;
  public readonly fargateNamespace?: string;

  constructor(scope: Construct, id: string, props: ContainerInsightProps) {
    super(scope, id);

    this.cluster = props.cluster;
    this.adotNamespace = props.adotNamespace ?? 'amazon-metrics';
    this.cloudwatchNamespace = props.cloudwatchNamespace ?? 'amazon-cloudwatch';
    this.fargateSupportMode = props.fargateSupportMode ?? 'NO';
    this.fargateNamespace = props.fargateNamespace ?? 'fargate-container-insights';

    if (this.fargateSupportMode === 'ONLY' || this.fargateSupportMode === 'BOTH') {
      this.deployAllMainfest(this.fargateNamespace, 'fargate');
    }

    if (this.fargateSupportMode === 'NO' || this.fargateSupportMode === 'BOTH') {
      this.deployAllMainfest(this.adotNamespace, 'adot');
      this.deployAllMainfest(this.cloudwatchNamespace, 'fluent');
    }
  }

  private deployAllMainfest(namespaceName: string, deployType: string): void {
    const namespace = this.cluster.addManifest(`${deployType}-namespace`, {
      apiVersion: 'v1',
      kind: 'Namespace',
      metadata: {
        name: namespaceName,
      },
    });

    var serviceAccountName: string, deployFile: string;

    if (deployType === 'adot') {
      serviceAccountName = 'aws-otel-sa';
      deployFile = path.join(__dirname, '../manifest/otel-container-insights-infra.yaml');
    } else if (deployType === 'fluent') {
      serviceAccountName = 'fluent-bit';
      deployFile = path.join(__dirname, '../manifest/fluent-bit.yaml');
      const configmap = this.cluster.addManifest('fluent-bit-config', {
        apiVersion: 'v1',
        kind: 'ConfigMap',
        data: {
          'cluster.name': this.cluster.clusterName,
          'http.port': '2020',
          'http.server': 'On',
          'logs.region': Aws.REGION,
          'read.head': 'Off',
          'read.tail': 'On',
        },
        metadata: {
          name: 'fluent-bit-cluster-info',
          namespace: namespaceName,
        },
      });

      configmap.node.addDependency(namespace);
    } else {
      serviceAccountName = 'adot-collector';
      deployFile = path.join(__dirname, '../manifest/otel-fargate-container-insights.yaml');
      this.cluster.addFargateProfile('FargateContainerInsight', {
        selectors: [{ namespace: namespaceName }],
      });
    }

    const serviceAccount = this.cluster.addServiceAccount(deployType, {
      namespace: namespaceName,
      name: serviceAccountName,
    });
    serviceAccount.role.addManagedPolicy(
      ManagedPolicy.fromAwsManagedPolicyName('CloudWatchAgentServerPolicy'),
    );
    serviceAccount.node.addDependency(namespace);

    const data = fs.readFileSync(deployFile, { encoding: 'utf8', flag: 'r' });

    if (deployType === 'fargate') {
      data.replace('us-east-1', Aws.REGION).replace('YOUR-EKS-CLUSTER-NAME', this.cluster.clusterName);
    }

    const deploy = parseAllDocuments(data);

    for (var d in deploy) {
      const doc = deploy[d].toJS();
      if (doc !== null) {

        if (doc.kind !== 'Namespace' && doc.kind !== 'ServiceAccount') {
          if (doc.metadata.namespace) doc.metadata.namespace = namespaceName;
          if (doc.subjects && doc.subjects[0].namespace) { doc.subjects[0].namespace = namespaceName; }

          const mf = this.cluster.addManifest(`${deployType}-${doc.kind}`, doc);
          mf.node.addDependency(namespace);
        }

      }
    }
  }
}
