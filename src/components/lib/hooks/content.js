import objectKeys from 'core-js-pure/stable/object/keys';
import { useServerData } from '../providers';
import { objectGet } from '../../../utils';

function replaceVariables(content, data) {
    switch (typeof content) {
        case 'string':
            return content.replace(/{\s*?([^\s]+?)\s*?}/g, (_, templateVariable) => {
                return objectGet(data, templateVariable) ?? '';
            });
        case 'object':
            if (Array.isArray(content)) {
                return content.map(line => replaceVariables(line, data));
            }

            return objectKeys(content).reduce(
                (acc, key) => ({
                    ...acc,
                    [key]: replaceVariables(content[key], data)
                }),
                {}
            );
        default:
            return '';
    }
}

export default function useContent(product, data = {}) {
    const { products } = useServerData();

    console.log(products);
    const { content = '' } = products.find(({ meta }) => meta.product === product);

    return replaceVariables(content, data);
}
