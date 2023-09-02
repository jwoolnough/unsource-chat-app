import BaseAvatar from "boring-avatars";
import type { AvatarProps as BaseAvatarProps } from "boring-avatars";

type AvatarProps = Pick<BaseAvatarProps, "name" | "size">;

const Avatar = (props: AvatarProps) => (
  <BaseAvatar
    variant="beam"
    colors={["#f18c4d", "#8389ad", "#fdead7", "#aeb1cb", "#383b54"]}
    {...props}
  />
);

export { Avatar };
