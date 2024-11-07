import styles from "./profileImage.module.css";

const ProfileImage = ({ name }) => {
  const nameParts = name.split(" ");
  const firstNameInitial = nameParts[0] ? nameParts[0][0] : "";
  const lastNameInitial = nameParts[1] ? nameParts[1][0] : "";

  return (
    <span className={styles.profileImage}>
      {firstNameInitial}
      {lastNameInitial}
    </span>
  );
};
export default ProfileImage;