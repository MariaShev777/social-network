import {ProfileStatus} from "./ProfileStatus";
import {create} from "react-test-renderer";


describe('ProfileStatus component', () => {
    test('status from the props should be in the state', () => {
        const component = create(<ProfileStatus status='MASHA'/>);
        const instance = component.getInstance();
        expect(instance.state.status).toBe('MASHA');
    });

    test('after creation the span with correct status should be displayed', () => {
        const component = create(<ProfileStatus status='MASHA'/>);
        const root = component.root;
        let span = root.findByType('span')
        expect(span).not.toBeNull();
    });

    test('after creation the input should not be displayed', () => {
        const component = create(<ProfileStatus status='MASHA'/>);
        const root = component.root;
        expect(() => {
            let input = root.findByType('input')
        }).toThrow();
    });

    test('after creation the span with correct status should be displayed', () => {
        const component = create(<ProfileStatus status='MASHA'/>);
        const root = component.root;
        let span = root.findByType('span')
        expect(span.children[0]).toBe('MASHA');
    });

    test('input should be displayed in edit mode instead of the span', () => {
        const component = create(<ProfileStatus status='MASHA'/>);
        const root = component.root;
        let span = root.findByType('span');
        span.props.onDoubleClick();
        let input = root.findByType('input');
        expect(input.props.value).toBe('MASHA');
    });

    test('callback should be called', () => {
        const mockCallback = jest.fn();
        const component = create(<ProfileStatus status='MASHA' updateStatus={mockCallback}/>);
        const instance = component.getInstance();
        instance && instance.deactivateEditMode();
        expect(mockCallback.mock.calls.length).toBe(1);
    });
})