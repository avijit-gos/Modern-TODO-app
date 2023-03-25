/** @format */

export function selectChatName(members, userId) {
  for (let i = 0; i < members.length; i++) {
    if (members[i]._id !== userId) {
      return members[i];
    }
  }
}
