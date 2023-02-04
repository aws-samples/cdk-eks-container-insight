const { awscdk } = require('projen');
const { DependabotScheduleInterval } = require('projen/lib/github');

const PROJECT_NAME = 'cdk-eks-container-insight';

const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Greg Huang',
  authorAddress: 'huadebin@amazon.com',
  cdkVersion: '2.61.1',
  defaultReleaseBranch: 'main',
  name: PROJECT_NAME,
  repositoryUrl: 'https://github.com/aws-samples/cdk-eks-container-insight.git',
  bundledDeps: ['yaml'], /* Runtime dependencies of this module. */
  description: 'CDK construct library that allows you enable an AWS EKS cluster for CloudWatch Container Insight', /* The description is just a string that helps people understand the purpose of the package. */
  devDeps: ['@aws-cdk/lambda-layer-kubectl-v24'], /* Build dependencies for this module. */
  keywords: ['eks', 'container', 'insight', 'cloudwatch'],
  publishToPypi: {
    distName: PROJECT_NAME,
    module: 'cdk_eks_container_insight',
  },

  dependabot: true,
  dependabotOptions: {
    scheduleInterval: DependabotScheduleInterval.MONTHLY,
  },
});

const common_excludes = [
  'cdk.out/',
  'cdk.context.json',
  '.env',
];

project.gitignore.exclude(...common_excludes);
project.npmignore.exclude(...common_excludes);

project.addTask('test:deploy', {
  exec: 'npx cdk deploy -a "npx ts-node -P tsconfig.dev.json --prefer-ts-exts test/integ.containerinsight.ts"',
});
project.addTask('test:destroy', {
  exec: 'npx cdk destroy -a "npx ts-node -P tsconfig.dev.json --prefer-ts-exts test/integ.containerinsight.ts"',
});
project.addTask('test:synth', {
  exec: 'npx cdk synth -a "npx ts-node -P tsconfig.dev.json --prefer-ts-exts test/integ.containerinsight.ts"',
});

project.synth();