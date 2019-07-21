import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import WorkList from "../WorkList/WorkList";
import { connect } from "react-redux";
import { createJob, deleteJob, updateJob } from "../WorkList/workOrderActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import RecentActivity from "../RecentActivity/RecentActivity";
import { firestoreConnect } from "react-redux-firebase";

const mapState = state => ({
  jobs: state.firestore.ordered.workOrders,
  loading: state.async.loading
});
const actions = {
  createJob,
  deleteJob,
  updateJob
};
class Dashboard extends Component {
 
  handleDeleteJob = id => {
    this.props.deleteJob(id);
  };
  render() {
    // const { isOpen, selectedJob } = this.state;
    const { jobs, loading } = this.props;
    if (loading) return <LoadingComponent />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <WorkList
            jobs={jobs}
            // selectJob={this.handleSelectJob}
            deleteJob={this.handleDeleteJob}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <RecentActivity />
        </Grid.Column>
      </Grid>
    );
  }
}
export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: 'workOrders' }])(Dashboard));
