import React from 'react';
import { connect } from 'react-redux';
import './Slide.css';
import { getALLSlides } from '../actions';

class Slide extends React.Component {
    state = {
        currentIndex: 1 
    };

    componentDidMount() {
        this.props.getALLSlides();
    }
    // will handle buttons 
    renderAdmin() {
        if (this.props.isSignedIn) {
            return(
                <div>
                    <button  
                    className="ui blue button"
                    onClick={this.startButton}
                    >
                        Start
                    </button>
                    <button  
                        className="ui orange button"
                        onClick={this.endButton}
                    >
                        End
                    </button>
                    <button 
                        className="ui left labeled icon button"
                        onClick={this.backButton}
                    >
                        <i className="left arrow icon"></i>
                            Back
                    </button>
                    <button 
                        className="ui right labeled icon button"
                        onClick={this.nextButton}
                    >
                        <i className="right arrow icon"></i>
                            Next
                    </button>
                    </div>
            );
        }
    }

    // autoPlay = () => {
    //     const interval = setInterval(() => {
    //        this.setState({
    //             currentIndex: this.state.currentIndex + 1
    //         });
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }
    
    // map over the image request, set to first image on default
    renderList() {
        return this.props.images.map(image => {
            if (image.id === this.state.currentIndex) {
                return (
                    <div className="item" key={image.id}>
                        <div className="content">
                            <img src={image.img} alt={image.caption} />
                        </div>
                    </div>
                );
            }
            return null;
        });
    }

    // pull caption off image object
    renderCaption() {
        return this.props.images.map(image => {
            if (image.id === this.state.currentIndex) {
                return (
                    <h2 key={image.id}>{image.caption}</h2>
                );
            }
            return null;
        });
    }

    startButton = () => {
        this.setState({
            currentIndex: 1
        });
    }

    endButton = () => {
        this.setState({
            currentIndex: this.props.length
        })
    }

    nextButton = () => {
        if ( this.state.currentIndex === this.props.length ) {
            this.setState({
                currentIndex: 1
            });
        } else {
            this.setState({
                currentIndex: this.state.currentIndex + 1
            });
        }
    }

    backButton = () => {
        if ( this.state.currentIndex === 1 ) {
            this.setState({
                currentIndex: this.props.length
            });
        } else {
            this.setState({
                currentIndex: this.state.currentIndex - 1
            });
        }
    }

    render() {
         return (
            <div>
                <div className="button-container">
                    {this.renderAdmin()}
                </div>
                <div className="caption-container">
                    {this.renderCaption()}
                </div>
                <div className="image-container">
                    {this.renderList()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { 
        images: Object.values(state.image),
        length: Object.keys(state.image).length,
        isSignedIn: state.auth.isSignedIn
    }
};

export default connect(mapStateToProps, { getALLSlides })(Slide);