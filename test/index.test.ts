import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Cluster, KubernetesVersion } from 'aws-cdk-lib/aws-eks';
import { ContainerInsight, FargateSupportMode } from '../src';

describe('Container Insight enable for EKS', () => {
  it('should deploy the ADOT Mainifests used default namespace name', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'test-stack');
    const cluster = new Cluster(stack, 'testcluster', {
      version: KubernetesVersion.V1_24,
    });

    new ContainerInsight(stack, 'ContainerInsight', {
      cluster: cluster,
    });

    const t = Template.fromStack(stack);

    t.hasResourceProperties('Custom::AWSCDK-EKS-KubernetesResource', {
      Manifest: Match.stringLikeRegexp('amazon-metrics'),
    });
  });

  it('should deploy the Fluent Mainifests used default namespace name', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'test-stack');
    const cluster = new Cluster(stack, 'testcluster', {
      version: KubernetesVersion.V1_24,
    });

    new ContainerInsight(stack, 'ContainerInsight', {
      cluster: cluster,
    });

    const t = Template.fromStack(stack);

    t.hasResourceProperties('Custom::AWSCDK-EKS-KubernetesResource', {
      Manifest: Match.stringLikeRegexp('amazon-cloudwatch'),
    });
  });

  it('should deploy the ADOT Mainifests used test name', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'test-stack');
    const cluster = new Cluster(stack, 'testcluster', {
      version: KubernetesVersion.V1_24,
    });

    new ContainerInsight(stack, 'ContainerInsight', {
      cluster: cluster,
      adotNamespace: 'test-adot',
    });

    const t = Template.fromStack(stack);

    t.hasResourceProperties('Custom::AWSCDK-EKS-KubernetesResource', {
      Manifest: Match.stringLikeRegexp('test-adot'),
    });
  });

  it('should deploy the Fluent Mainifests used test name', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'test-stack');
    const cluster = new Cluster(stack, 'testcluster', {
      version: KubernetesVersion.V1_24,
    });

    new ContainerInsight(stack, 'ContainerInsight', {
      cluster: cluster,
      cloudwatchNamespace: 'test-fluent',
    });

    const t = Template.fromStack(stack);

    t.hasResourceProperties('Custom::AWSCDK-EKS-KubernetesResource', {
      Manifest: Match.stringLikeRegexp('test-fluent'),
    });
  });

  it('should deploy the Fargate Mainifests used default namespace  name', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'test-stack');
    const cluster = new Cluster(stack, 'testcluster', {
      version: KubernetesVersion.V1_24,
    });

    new ContainerInsight(stack, 'ContainerInsight', {
      cluster: cluster,
      fargateSupportMode: FargateSupportMode.ONLY,
    });

    const t = Template.fromStack(stack);

    t.hasResourceProperties('Custom::AWSCDK-EKS-KubernetesResource', {
      Manifest: Match.stringLikeRegexp('fargate-container-insights'),
    });
  });

  it('should deploy the Fargate Mainifests used test name', () => {
    const app = new cdk.App();
    const stack = new cdk.Stack(app, 'test-stack');
    const cluster = new Cluster(stack, 'testcluster', {
      version: KubernetesVersion.V1_24,
    });

    new ContainerInsight(stack, 'ContainerInsight', {
      cluster: cluster,
      fargateNamespace: 'test-fargate',
      fargateSupportMode: FargateSupportMode.ONLY,
    });

    const t = Template.fromStack(stack);

    t.hasResourceProperties('Custom::AWSCDK-EKS-KubernetesResource', {
      Manifest: Match.stringLikeRegexp('test-fargate'),
    });
  });
});