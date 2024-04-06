class MyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.reset();
    }

    reset() {
        // Always set the initial state in its own function, so that
        // you can trivially reset your components at any point.
        this.state = {
            inputValue: ''
        };
    }

    render() {
        return (
            // ...
            <input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
            // ...
        );
    },

    updateInputValue(evt) {
        const val = evt.target.value;
        // ...       
        this.setState({
            inputValue: val
        });
    }
});