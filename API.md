# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### ContainerInsight <a name="ContainerInsight" id="cdk-eks-container-insight.ContainerInsight"></a>

#### Initializers <a name="Initializers" id="cdk-eks-container-insight.ContainerInsight.Initializer"></a>

```typescript
import { ContainerInsight } from 'cdk-eks-container-insight'

new ContainerInsight(scope: Construct, id: string, props: ContainerInsightProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-eks-container-insight.ContainerInsight.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-eks-container-insight.ContainerInsight.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-eks-container-insight.ContainerInsight.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-eks-container-insight.ContainerInsightProps">ContainerInsightProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-eks-container-insight.ContainerInsight.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-eks-container-insight.ContainerInsight.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="cdk-eks-container-insight.ContainerInsight.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-eks-container-insight.ContainerInsightProps">ContainerInsightProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-eks-container-insight.ContainerInsight.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="cdk-eks-container-insight.ContainerInsight.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-eks-container-insight.ContainerInsight.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-eks-container-insight.ContainerInsight.isConstruct"></a>

```typescript
import { ContainerInsight } from 'cdk-eks-container-insight'

ContainerInsight.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-eks-container-insight.ContainerInsight.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-eks-container-insight.ContainerInsight.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-eks-container-insight.ContainerInsight.property.cluster">cluster</a></code> | <code>aws-cdk-lib.aws_eks.Cluster</code> | *No description.* |
| <code><a href="#cdk-eks-container-insight.ContainerInsight.property.adotNamespace">adotNamespace</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-eks-container-insight.ContainerInsight.property.cloudwatchNamespace">cloudwatchNamespace</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-eks-container-insight.ContainerInsight.property.fargateNamespace">fargateNamespace</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-eks-container-insight.ContainerInsight.property.fargateSupportMode">fargateSupportMode</a></code> | <code>string</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-eks-container-insight.ContainerInsight.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `cluster`<sup>Required</sup> <a name="cluster" id="cdk-eks-container-insight.ContainerInsight.property.cluster"></a>

```typescript
public readonly cluster: Cluster;
```

- *Type:* aws-cdk-lib.aws_eks.Cluster

---

##### `adotNamespace`<sup>Optional</sup> <a name="adotNamespace" id="cdk-eks-container-insight.ContainerInsight.property.adotNamespace"></a>

```typescript
public readonly adotNamespace: string;
```

- *Type:* string

---

##### `cloudwatchNamespace`<sup>Optional</sup> <a name="cloudwatchNamespace" id="cdk-eks-container-insight.ContainerInsight.property.cloudwatchNamespace"></a>

```typescript
public readonly cloudwatchNamespace: string;
```

- *Type:* string

---

##### `fargateNamespace`<sup>Optional</sup> <a name="fargateNamespace" id="cdk-eks-container-insight.ContainerInsight.property.fargateNamespace"></a>

```typescript
public readonly fargateNamespace: string;
```

- *Type:* string

---

##### `fargateSupportMode`<sup>Optional</sup> <a name="fargateSupportMode" id="cdk-eks-container-insight.ContainerInsight.property.fargateSupportMode"></a>

```typescript
public readonly fargateSupportMode: string;
```

- *Type:* string

---


## Structs <a name="Structs" id="Structs"></a>

### ContainerInsightProps <a name="ContainerInsightProps" id="cdk-eks-container-insight.ContainerInsightProps"></a>

#### Initializer <a name="Initializer" id="cdk-eks-container-insight.ContainerInsightProps.Initializer"></a>

```typescript
import { ContainerInsightProps } from 'cdk-eks-container-insight'

const containerInsightProps: ContainerInsightProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-eks-container-insight.ContainerInsightProps.property.cluster">cluster</a></code> | <code>aws-cdk-lib.aws_eks.Cluster</code> | The EKS Cluster to attach to. |
| <code><a href="#cdk-eks-container-insight.ContainerInsightProps.property.adotNamespace">adotNamespace</a></code> | <code>string</code> | The Kubernetes namespace to install ADOT to. |
| <code><a href="#cdk-eks-container-insight.ContainerInsightProps.property.cloudwatchNamespace">cloudwatchNamespace</a></code> | <code>string</code> | The Kubernetes namespace to install CloudWatch agent to. |
| <code><a href="#cdk-eks-container-insight.ContainerInsightProps.property.fargateNamespace">fargateNamespace</a></code> | <code>string</code> | Fargate container insight namepsace. |
| <code><a href="#cdk-eks-container-insight.ContainerInsightProps.property.fargateSupportMode">fargateSupportMode</a></code> | <code><a href="#cdk-eks-container-insight.FargateSupportMode">FargateSupportMode</a></code> | Fargate support mode for NO/ONLY/BOTH. |

---

##### `cluster`<sup>Required</sup> <a name="cluster" id="cdk-eks-container-insight.ContainerInsightProps.property.cluster"></a>

```typescript
public readonly cluster: Cluster;
```

- *Type:* aws-cdk-lib.aws_eks.Cluster

The EKS Cluster to attach to.

---

##### `adotNamespace`<sup>Optional</sup> <a name="adotNamespace" id="cdk-eks-container-insight.ContainerInsightProps.property.adotNamespace"></a>

```typescript
public readonly adotNamespace: string;
```

- *Type:* string
- *Default:* amazon-metrics

The Kubernetes namespace to install ADOT to.

---

##### `cloudwatchNamespace`<sup>Optional</sup> <a name="cloudwatchNamespace" id="cdk-eks-container-insight.ContainerInsightProps.property.cloudwatchNamespace"></a>

```typescript
public readonly cloudwatchNamespace: string;
```

- *Type:* string
- *Default:* amazon-cloudwatch

The Kubernetes namespace to install CloudWatch agent to.

---

##### `fargateNamespace`<sup>Optional</sup> <a name="fargateNamespace" id="cdk-eks-container-insight.ContainerInsightProps.property.fargateNamespace"></a>

```typescript
public readonly fargateNamespace: string;
```

- *Type:* string
- *Default:* fargate-container-insights

Fargate container insight namepsace.

---

##### `fargateSupportMode`<sup>Optional</sup> <a name="fargateSupportMode" id="cdk-eks-container-insight.ContainerInsightProps.property.fargateSupportMode"></a>

```typescript
public readonly fargateSupportMode: FargateSupportMode;
```

- *Type:* <a href="#cdk-eks-container-insight.FargateSupportMode">FargateSupportMode</a>
- *Default:* NO

Fargate support mode for NO/ONLY/BOTH.

---



## Enums <a name="Enums" id="Enums"></a>

### FargateSupportMode <a name="FargateSupportMode" id="cdk-eks-container-insight.FargateSupportMode"></a>

#### Members <a name="Members" id="Members"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-eks-container-insight.FargateSupportMode.NO">NO</a></code> | No support for Fargate profile only support EC2. |
| <code><a href="#cdk-eks-container-insight.FargateSupportMode.ONLY">ONLY</a></code> | Only support for Fargate profile no EC2. |
| <code><a href="#cdk-eks-container-insight.FargateSupportMode.BOTH">BOTH</a></code> | Both support Fargate profile and EC2. |

---

##### `NO` <a name="NO" id="cdk-eks-container-insight.FargateSupportMode.NO"></a>

No support for Fargate profile only support EC2.

---


##### `ONLY` <a name="ONLY" id="cdk-eks-container-insight.FargateSupportMode.ONLY"></a>

Only support for Fargate profile no EC2.

---


##### `BOTH` <a name="BOTH" id="cdk-eks-container-insight.FargateSupportMode.BOTH"></a>

Both support Fargate profile and EC2.

---

