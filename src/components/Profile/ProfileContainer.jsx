import React from "react";
import { connect } from "react-redux";
import Profile from "./Profile";
import { getStatus, savePhoto, setUser, setUserProfile, updateStatus } from "../../redux/profile-reducer";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { getProfileSelector, getStatusSelector } from "../../redux/profile-selectors";
import { getAuthorizedUserIdSelector } from "../../redux/auth-selectors";
import { getUsersSuperSelector } from "../../redux/users-selectors";

class ProfileContainer extends React.Component {
	refreshProfile() {
		let userId = this.props.match.params.userId;

		if (!userId) {
			userId = this.props.authorizedUserId;
			if (!userId) {
				this.props.history.push("/login");
			}
		}

		this.props.setUser(userId);
		this.props.getStatus(userId);
	}

	componentDidMount() {
		this.refreshProfile();
	}

	componentDidUpdate(prevProps, prevState) {
		if (this.props.match.params.userId !== prevProps.match.params.userId) {
			this.refreshProfile();
		}
	}

	render() {
		return (
			<Profile
				{...this.props}
				profile={this.props.profile}
				isOwner={!this.props.match.params.userId}
				status={this.props.status}
				updateStatus={this.props.updateStatus}
				users={this.props.users}
			/>
		);
	}
}

const mapStateToProps = state => {
	return {
		profile: getProfileSelector(state),
		status: getStatusSelector(state),
		authorizedUserId: getAuthorizedUserIdSelector(state),
		users: getUsersSuperSelector(state),
	};
};

export default compose(
	connect(mapStateToProps, { setUserProfile, setUser, getStatus, updateStatus, savePhoto }),
	withRouter,
	withAuthRedirect
)(ProfileContainer);