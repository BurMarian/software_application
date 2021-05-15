/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Preloader from "../../common/Preloader/Preloader";
import style from "./ProfileInfo.module.css";
import defaultImg from "../../../assets/images/user_photo.jpg";

const ProfileInfo = props => {
	if (!props.profile) {
		return <Preloader />;
	}

	return (
		<div className={style.timeline_cover}>
			<div className={style.timeline_wrapper}>
				<div className={style.timeline_nav_bar}>
					<div className={style.profile_info}>
						<div>
							<img
								className={style.profile_info_avatarka}
								src={!props.profile.photos.large ? defaultImg : props.profile.photos.large}
								alt=''
							/>
						</div>
						<div className={style.profile_info_fullname}>{props.profile.fullName}</div>
					</div>

					<div className={style.profile_menu}>
						<ul className={style.list_profile_menu}>
							<li className={style.item}>
								<a href='' className={style.active}>
									Timeline
								</a>
							</li>
							<li className={style.item}>
								<a href=''>About</a>
							</li>
							<li className={style.item}>
								<a href=''>Album</a>
							</li>
							<li className={style.item}>
								<a href=''>Friends</a>
							</li>
						</ul>

						<div>
							<button className={style.button}>Add Friend</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileInfo;
