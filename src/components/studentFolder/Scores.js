import React, {Component, Fragment} from 'react';
import axios from 'axios';

class Scores extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scores: [],
        }
    }

    async componentDidMount() {
        const token = localStorage.getItem('token');
        const apiCall = '/api/scores/get_user_score/';

        try {
            const {data: scores} = await axios.get(apiCall, {
                headers: {'Authorization': `JWT ${token}`}
            });
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

    render() {
        const {scores} = this.state;
        return (
            <Fragment>
                <div className="card">
                    <div className="card-header text-center">
                        <h5>Score list</h5>
                    </div>
                    <div className="card-body">
                        {scores.length > 0 ?
                            <div className="table-responsive">
                                <table className='table table-bordered table-striped table-hover'>
                                    <thead>
                                    <tr>
                                        <th></th>
                                        <th>SUBJECT</th>
                                        <th>TOPIC</th>
                                        <th>SCORE</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {scores.map((score, i) => {
                                        return <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{score.subject_title}</td>
                                            <td>{score.topic}</td>
                                            <td><b>{score.score}%</b></td>
                                        </tr>
                                    })}
                                    </tbody>
                                </table>
                            </div> :
                            <div className="text-center">
                                <h6>You dont have any score at this moment, go try some questions</h6>
                            </div>
                        }
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Scores;