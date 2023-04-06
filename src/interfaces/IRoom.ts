interface IRoom {
    socketRoom: string;
    userId?: string | undefined;
    previousRoom: string;
}
export default IRoom;