import React, {Component, Fragment} from 'react';
import axios from 'axios'
import {SortAscendingOutlined, SortDescendingOutlined} from "@ant-design/icons";


class ScoreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scores: [],
            desc: false,
        }
    }

    async componentDidMount() {
        const apiCall = '/api/scores/get_student_scores/';
        try {
            const {data: scores} = await axios.get(apiCall);
            this.setState({scores})
        } catch (e) {
            if (e) {
                console.log(e.response.data)
            }
        }
    }

    componentWillUnmount() {
        this.setState = ((state, callback) => {

        })
    }

    sortSubject = () => {
        const {desc} = this.state;
        const subjectFilter = this.state.scores.sort((a, b) => {
            if (!desc) return a.subject_title < b.subject_title ? -1 : 1;
            else return b.subject_title > a.subject_title ? 1 : -1
        });
        this.setState({scores: subjectFilter, desc: !this.state.desc})
    };

    sortTopic = () => {
        const {desc} = this.state
        const topicFilter = this.state.scores.sort((a, b) => {
            if (!desc) return a.topic < b.topic ? -1 : 1;
            else return b.topic > a.topic ? 1 : -1
        });
        this.setState({scores: topicFilter, desc: !this.state.desc})
    };

    sortScores = () => {
        const {desc} = this.state;
        const scoresFilter = this.state.scores.sort((a, b) => {
            if (!desc) return a.score < b.score ? -1 : 1;
            else return b.score > a.score ? 1 : -1
        });
        this.setState({scores: scoresFilter, desc: !this.state.desc})
    };

    sortName = () => {
        const nameFilter = this.state.scores.sort((a, b) => {
            return a.user.last_name < b.user.last_name ? -1 : 1
        });
        this.setState({scores: nameFilter})
    };

    render() {
        const {scores, desc} = this.state;
        const options = {
            fontSize: 20,
            marginLeft: 6,
            opacity: 0.5
        };
        return (
            <Fragment>
                <div className="card">
                    <div className="card-header text-center">
                        <h5>Students Scores List</h5>
                    </div>
                    <div className="card-body">
                        {scores !== undefined && scores.length > 0 ?
                            <div className="table-responsive">
                                <table className='table table-bordered table-striped table-hover'>
                                    <thead>
                                    <tr>
                                        <th onClick={this.sortName} style={{cursor: 'pointer'}}>
                                            LAST NAME {!desc ? <SortAscendingOutlined style={options}/> :
                                            <SortDescendingOutlined style={options}/>}</th>
                                        <th onClick={this.sortSubject} style={{cursor: 'pointer'}}>
                                            SUBJECT {!desc ? <SortAscendingOutlined style={options}/> :
                                            <SortDescendingOutlined style={options}/>}</th>
                                        <th onClick={this.sortTopic} style={{cursor: 'pointer'}}>
                                            TOPIC {!desc ? <SortAscendingOutlined style={options}/> :
                                            <SortDescendingOutlined style={options}/>}</th>
                                        <th onClick={this.sortScores} style={{cursor: 'pointer'}}>
                                            SCORE {!desc ? <SortAscendingOutlined style={options}/> :
                                            <SortDescendingOutlined style={options}/>}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {scores.map((score, i) => {
                                        return <tr key={i}>
                                            <td>{score.user.last_name}</td>
                                            <td>{score.subject_title}</td>
                                            <td>{score.topic}</td>
                                            <td><b>{score.score}%</b></td>
                                        </tr>
                                    })}
                                    </tbody>
                                </table>
                            </div> :
                            <div className="text-center">
                                <h6>No students score at this moment, please check back again.</h6>
                            </div>
                        }
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ScoreList;