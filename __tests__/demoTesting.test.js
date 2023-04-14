import DemoTesting from "../src/screens/demoTesting";
import renderer from 'react-test-renderer'

// test('snapshot', () => {
//     const tree = renderer
// .create(<DemoTesting/>)
// .toJSON();
// expect(tree).toMatchSnapshot();
// })

// it('function and state testings', () =>{
//     let tree = renderer.create(<DemoTesting />).getInstance();
//     expect(tree.state.counter).toEqual(3);
// })

const findElement = (tree, element) => {
    let result = undefined;

    for (ele in tree.children) {
        if (tree.children[ele].props.testID == element) {
            result = true
        }
    }
    return result;
}

it('find name element', () => {
    let tree = renderer.create(<DemoTesting />).toJSON();
    expect(findElement(tree, 'name')).toBeDefined();
})