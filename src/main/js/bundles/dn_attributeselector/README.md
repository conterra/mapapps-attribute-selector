# dn_attributeselector Bundle Documentation

## Bundle Description
The `dn_attributeselector` bundle provides an interactive selector widget for filtering map layers based on attribute values. It allows users to dynamically adjust a numeric attribute filter (e.g., house number) on one or more layers. The widget supports configuration of the target attribute, comparison relation, and selector settings such as range, step, and visible elements. It can automatically apply or remove the filter when the widget is opened or closed, and supports group layers.

## Usage
- The bundle must be added to the app.json in "allowedBundles" as `dn_attributeselector`.
- The bundle provides a Tool that must be added to a toolset in the `app.json`, the tool ID to reference is `attributeSelectorWidgetToggleTool`

## Configuration Reference

```json
{
    "dn_attributeselector": {
        "Config": {
            "layerIds": [],
            "applyToGroupContents": false,
            "targetAttribute": "",
            "attributeValueRelation": ">=",
            "applyDefinitionExpressionOnWidgetOpen": true,
            "removeDefinitionExpressionOnWidgetClose": true,
            "attributeValues": [
                    {
                     "label" : "Label 1",
                     "value" : "1"
                     },
                    {"value" : "2",}],
            "mode": ""

        }
    }
}
```

| Property                                  | Type     | Values                          | Default  | Description                                                  |
|-------------------------------------------|----------|---------------------------------|----------|--------------------------------------------------------------|
| layerIds                                  | string[] | Any layer IDs                   | []       | List of layer IDs to which the selector filter will be applied |
| applyToGroupContents                      | boolean  | true, false                     | false    | Whether to apply the filter to all sublayers of group layers |
| targetAttribute                           | string   | Any attribute name              | ""       | The attribute field to filter on                             |
| attributeValueRelation                    | string   | "=", "<", ">", "<=", ">=", "!=" | ">="     | The comparison operator for the filter                       |
| applyDefinitionExpressionOnWidgetOpen     | boolean  | true, false                     | true     | Whether to apply the filter when the widget is opened        |
| removeDefinitionExpressionOnWidgetClose   | boolean  | true, false                     | true     | Whether to remove the filter when the widget is closed       |
| attributeValues                           | object[] | Any attribute values            | []       | List of attribute values and optional labels to appear in selector                 |
| mode           | string   | "checkbox", "button", "radio"                              | "checkbox"     | Selector mode                                  |

### Additional Considerations
- If `layerIds` contains group layers and `applyToGroupContents` is true, the filter will be applied to all sublayers.
- Ensure that the `targetAttribute` exists on all specified layers.
- The widget will only function if the referenced layers are present in the map.
- Edge cases: If a layer is missing or the attribute is not found, the filter will not be applied to that layer.
