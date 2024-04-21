import re
def replace_variables(array, obj):
    for items_list in array:
        for item in items_list:
            if isinstance(item, dict) and 'items' in item:
                for sub_item in item['items']:
                    if isinstance(sub_item, dict) and 'text' in sub_item:
                        text = sub_item['text']
                        variables = re.findall(r'\{\{([^{}]+)\}\}', text)
                        for var in variables:
                            value = obj.get(var, 'None')
                            text = text.replace('{{' + var + '}}', str(value))
                        sub_item['text'] = text
    return array
