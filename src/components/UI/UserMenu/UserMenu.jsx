import { useDispatch } from "react-redux";
import { useAuth } from "@/hooks";
import { logOut } from "@/redux/auth/operations";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { UserWrap, TextWrap, SpanName } from "./UserMenu.styled";

export default function UserMenu() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  return (
    <UserWrap>
      <TextWrap>
        <SpanName>{user.name}</SpanName>
        <Avatar
          style={{ width: 24, height: 24 }}
          src="/broken-image.jpg"
        />{" "}
      </TextWrap>
      <Button color="inherit" type="button" onClick={() => dispatch(logOut())}>
        Logout
      </Button>
    </UserWrap>
  );
}
