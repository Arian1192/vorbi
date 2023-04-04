interface IRoom {
    socketRoom: string;
    type: string;
    userId: string;
    prevSocketIdRoom?: string;
}
export default IRoom;