import styles from "./profileImage.module.css";

const ProfileImage = ({ name }) => {
  const initials = name.slice(0, 2).toUpperCase();
  return (
    <span className={styles.profileImage}>
      {initials}
    </span>
  );
};
export default ProfileImage;