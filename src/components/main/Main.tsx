import { trpc } from "@/utils/trpc";
import { useRef, useEffect, LegacyRef } from "react";
import { useUser } from "@clerk/nextjs";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { EmojiClickData } from "emoji-picker-react";
import IMessage from "@/interfaces/IMessage";
import dynamic from "next/dynamic";
import OrganizationContext from "@/Contexts/OrganizationContext";
import { wsLink } from "@trpc/client";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

const Main = () => {
	const { register, handleSubmit, reset, setFocus, setValue, getValues } =
		useForm();
	const { user } = useUser();
	const [data, setData] = useState<any>([]);
	const [PickerOn, setPickerOn] = useState(false);
	const { organizationId } = useContext(OrganizationContext);
	const [actualRoom, setActualRoom] = useState<string>("");
	const [onNotificationMessage, setOnNotificationMessage] = useState<any>({});
	const [handleNotification, setHandleNotification] = useState(false);
	const [clientId, setClientId] = useState<string>("");

	// que se ejecute cuando cambie el id de la organizacion
	useEffect(() => {
		setActualRoom(organizationId);
	}, [organizationId]);
	console.log("actual room despues el useEffect", actualRoom);

	// Mutation
	const mutation = trpc.messageRouter.message.useMutation();

	// quiero mandar el mensaje solo a la room que estoy
	// y que no se mande a todas las rooms
	const onSubmit = handleSubmit(async (data) => {
		mutation.mutate({
			socketRoom: actualRoom,
			id: user?.id,
			text: data.message,
			urlImageProfile: user?.profileImageUrl,
			date: new Date().toLocaleTimeString(),
		});
		reset();
	});

	// Subscription to newMessage
	trpc.messageRouter.onNewMessage.useSubscription(undefinded, {
		onData(message) {
			if(message.socketRoom === actualRoom) {
				setData((data: any) => [...data, message]);
			}else if(message.socketRoom !== actualRoom){
				setOnNotificationMessage(message);
				setHandleNotification(true);
				setTimeout(() => {
					setHandleNotification(false);
				}, 3000);
			}

		},
	});

	const handleEmojiClick = (emoji: EmojiClickData) => {
		const prevMessage = getValues("message");
		setValue("message", prevMessage + emoji.emoji);
		setPickerOn(!PickerOn);
		setFocus("message");
	};
	const handleOpenPicker = () => {
		setPickerOn(!PickerOn);
	};

	const scrollIntoView = (el: any) => {
		if (el) {
			el.scrollIntoView({ behavior: "smooth" });
		}
	};

	return (
		<div className="w-screen h-screen bg-base-300 ">
			{handleNotification && (
				<div className="fixed bottom-16 left-5 p-4 m-4 bg-green-500 rounded shadow-xl animate-slideInDown">
					<div className="flex items-center space-x-4">
						<div className="flex-shrink-0 flex justify-center items-center gap-5 ">
							<img
								className="w-10 h-10 rounded-full"
								src={onNotificationMessage?.urlImageProfile}
								alt=""
							/>
							<p>{onNotificationMessage.text}</p>
						</div>
					</div>
				</div>
			)}
			<ul className="w-full h-[90%] p-10 overflow-y-auto flex-grow-1 scrollbar-hide">
				<p className="text-slate-400">
					Organization with id ▶️ {organizationId} and clientSocketId ▶️
					{clientId}
				</p>

				{data.map((Message: IMessage, index: number) => {
					return (
						<li key={index} ref={scrollIntoView} className="">
							<div
								className={`chat ${
									Message.id === user?.id ? "chat-start" : "chat-end"
								}`}
							>
								<div className="chat-image avatar">
									<div className="w-10 rounded-full">
										<img
											src={
												Message.id === user?.id
													? user?.profileImageUrl
													: Message.urlImageProfile
											}
										/>
									</div>
								</div>
								<div
									className={`chat-bubble ${
										Message.id === user?.id
											? "chat-bubble-info"
											: "chat-bubble-success"
									}`}
								>
									<div
										className={`chat-header ${
											Message.id === user?.id
												? "text-secondary-focus"
												: "text-neutral-600"
										} `}
									>
										{Message.date}
									</div>
									<p>{Message.text}</p>
								</div>
							</div>
						</li>
					);
				})}
			</ul>
			<div className="h-[10%] p-4 flex gap-4  bg-neutral-focus">
				<form
					onSubmit={onSubmit}
					className="w-full flex flex-row justify-center items-end gap-5"
				>
					<input
						{...register("message")}
						type="text"
						placeholder="Type here"
						className="input input-bordered w-full "
					/>
					{!PickerOn && (
						<div className="flex w-100%  h-10">
							<span className="cursor-pointer " onClick={handleOpenPicker}>
								😃
							</span>
						</div>
					)}
					{PickerOn && (
						<div>
							<button
								className="absolute left-[90%] bottom-[5%] z-10"
								onClick={handleOpenPicker}
							>
								❌
							</button>
							<Picker onEmojiClick={handleEmojiClick} />
						</div>
					)}
					<button type="submit" className="btn btn-outline btn-secondary ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6 "
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
							/>
						</svg>
					</button>
				</form>
			</div>
		</div>
	);
};

export default Main;

// TODO pass trough the new Component Chat props like user and Message to clean the code at Main Component and make it more readable.
// TODO abstraction of the interface out of the Main Component
