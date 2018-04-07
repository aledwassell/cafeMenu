let countDown = (num) => {
    if(num === 0) return;
    countDown(num - 1)
    console.log('count down is at: ',num);
}

countDown(5);

let categories = [
    {id: 'animals', 'parent': null},
    {id: 'mammals', 'parent': 'animals'},
    {id: 'dogs', 'parent': 'mammals'},
    {id: 'cats', 'parent': 'mammals'},
    {id: 'chihuahua', 'parent': 'dogs'},
    {id: 'labrador', 'parent': 'dogs'},
    {id: 'persian', 'parent': 'cats'},
    {id: 'blue', 'parent': 'cats'},
];

let makeTree = (categories, parent) => {
    let node = {}
    categories
    .filter(c => c.parent === parent)
    .forEach(c => node[c.id] =
        makeTree(categories, c.id))
    return node;
}

console.log(
    JSON.stringify(
        makeTree(categories, null), null, 2
    )
);
