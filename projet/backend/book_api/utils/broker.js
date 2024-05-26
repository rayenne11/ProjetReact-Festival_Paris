// import { connect } from "amqplib";

// export const sendMessageToQueue = async (queue, messageContent) => {
//   try {
//     const connection = await connect("amqp://localhost:5672");
//     const channel = await connection.createChannel();

//     await channel.assertQueue(queue, {
//       durable: true,
//     });

//     channel.sendToQueue(queue, Buffer.from(JSON.stringify(messageContent)));

//     console.log(
//       `Message sent to RabbitMQ queue '${queue}': ${messageContent}`
//     );
//   } catch (error) {
//     console.error("Error sending message to RabbitMQ:", error);
//   }
// };

// export const receiveMessageFromQueue = async (queue) => {
//   try {
//     const connection = await connect("amqp://localhost:5672");
//     const channel = await connection.createChannel();

//     await channel.assertQueue(queue, {
//       durable: true,
//     });

//     console.log(`Waiting for messages in RabbitMQ queue '${queue}'...`);

//     return new Promise((resolve, reject) => {
//       channel.consume(queue, (message) => {
//         if (message !== null) {
//           console.log(
//             `Received message from RabbitMQ queue '${queue}': ${message.content.toString()}`
//           );
//           const parsedData = JSON.parse(message.content.toString());
//           channel.ack(message);
//           resolve(parsedData);
//         }
//       });
//     });
//   } catch (error) {
//     console.error("Error receiving message from RabbitMQ:", error);
//     throw error;
//   }
// };
