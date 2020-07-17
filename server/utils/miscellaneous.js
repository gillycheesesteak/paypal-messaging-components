export function getDataByTag(data, tag) {
    let selected = data.find(([, tags]) => tags.includes(tag));
    if (selected) {
        return selected[0];
    }

    if (tag.includes('.')) {
        const [fallbackTag] = tag.split('.', 1);
        selected = data.find(([, tags]) => tags.includes(fallbackTag));
        if (selected) {
            return selected[0];
        }
    }

    selected = data.find(([, tags]) => tags.includes('default'));
    if (selected) {
        return selected[0];
    }

    return '';
}
