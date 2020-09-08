import React from "react";
import ReactDOM from "react-dom";

const SIZE = 40;

class Visualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
        };
    }

    componentDidMount() {
        const el = document.createElement("div");
        el.id = "react-touch-visualizer";
        document.body.prepend(el);

        this.setState({
            loaded: true,
        });
    }

    render() {
        return (
            this.state.loaded &&
            ReactDOM.createPortal(
                <Canvas />,
                document.querySelector("#react-touch-visualizer")
            )
        );
    }
}

const itemStyle = {
    height: SIZE,
    width: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: "rgba(0,0,0,0.5)",
    position: "fixed",
    border: "1px solid #fff",
    zIndex: 9999,
    pointerEvents: "none",
    transition: "opacity 300ms ease-in-out",
};

class Canvas extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            touches: [],
        };

        this.onTouchEnd = this.onTouchEnd.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchStart = this.onTouchStart.bind(this);
    }

    componentDidMount() {
        document.body.addEventListener("touchstart", this.onTouchStart);
        document.body.addEventListener("touchmove", this.onTouchMove);
        document.body.addEventListener("touchend", this.onTouchEnd);

        document.body.style.minHeight = "100vh";
    }

    onTouchStart(e) {
        this.setState({
            touches: e.touches,
        });
    }

    onTouchEnd(e) {
        this.setState({
            touches: e.touches,
        });
    }

    onTouchMove(e) {
        this.setState({
            touches: e.touches,
        });
    }

    getTouchItems() {
        const result = [];

        for (let i = 0; i < this.state.touches.length; i++) {
            result.push({
                id: i,
                x: this.state.touches[i].clientX - SIZE / 2,
                y: this.state.touches[i].clientY - SIZE / 2,
            });
        }

        return result;
    }

    render() {
        return (
            <>
                {this.getTouchItems().map((item) => (
                    <Item
                        key={item.id}
                        style={{
                            top: item.y,
                            left: item.x,
                        }}
                    />
                ))}
            </>
        );
    }
}

class Item extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            opacity: 0,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                opacity: 1,
            });
        }, 0);
    }

    render() {
        return <div style={{ ...this.props.style, ...itemStyle, ...this.state }} />;
    }
}

export default Visualizer;
