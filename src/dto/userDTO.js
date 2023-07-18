export function toDTO(user) {
    return {
        id: user._id,
        username: user.username,
    }
   };
