interface IMessage {
	socketRoom: string;
	text: string;
	id: string | undefined;
	urlImageProfile: string | undefined;
	date: string;
}
export default IMessage;