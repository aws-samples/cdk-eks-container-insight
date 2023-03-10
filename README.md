# CDK EKS Container Insight

This construct configures the necessary dependencies and installs [Amazon CloudWatch Container Insight](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContainerInsights.html)
on an EKS cluster managed by AWS CDK.

## Using

In your CDK project, initialize a new Container Insight construct for your EKS cluster, like this:

```typescript
const cluster = new Cluster(this, 'testCluster', {
  vpc: vpc,
  role: clusterRole,
  version: KubernetesVersion.V1_24,
  kubectlLayer: new KubectlV24Layer(this, 'KubectlLayer'),
  defaultCapacity: 1
});

new ContainerInsight(this, 'ContainerInsight', {
  cluster: cluster,
});
```

This will install and configure Container Insight on EC2 managed nodes in your cluster. 

## Testing

This construct adds a custom task to [projen](https://projen.io/), so you can test a full deployment
of an EKS cluster with CloudWatch Container Insight installed as specified in `test/integ.containerinsight.ts` by running the
following:

```sh
export CDK_DEFAULT_REGION=<aws region>
export CDK_DEFAULT_ACCOUNT=<account id>
npx projen test:deploy
```

And you can valid the construct installation by login in CloudWatch console to 

![](images/pic.png)

As the above will create a cluster. And the Container Insight will show your how cluster information in CloudWatch.

You can clean things up by deleting the deployment and the CDK test stack:

```sh
npx projen test:destroy
```

## Security

See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License

This project is licensed under the Apache-2.0 License.

