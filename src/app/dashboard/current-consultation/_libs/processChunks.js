export function processChunks(data) {
  // Initialize an empty array to store processed topics
  const processedTopics = [];

  // Loop through each chunk in the data
  for (const chunkName in data) {
    const chunk = data[chunkName];

    // Access the "choices" array within each chunk
    const choices = chunk.choices;

    // Loop through each choice and extract topics
    for (const choice of choices) {
      const text = choice.text;

      // Assuming topics are identified by a specific pattern (modify as needed)
      const topicMatches = text.match(/([A-Z\s]+):(.*)/g);

      // Process each topic match
      if (topicMatches) {
        for (const match of topicMatches) {
          const [topic, value] = match.split(':');

          // Trim both the topic and value
          const trimmedTopic = topic.trim();
          const trimmedValue = value.trim();

          // Check if the topic already exists in processedTopics
          const existingTopicIndex = processedTopics.findIndex(
            (item) => item.topic === trimmedTopic
          );

          if (existingTopicIndex !== -1) {
            // If the topic exists, append the value to its value array
            processedTopics[existingTopicIndex].value.push(trimmedValue);
          } else {
            // If the topic does not exist, create a new topic object
            processedTopics.push({ topic: trimmedTopic, value: [trimmedValue] });
          }
        }
      }
    }
  }

  // Ensure all topics are checked (optional)
  // You can implement additional logic here to identify and handle missing topics

  return processedTopics;
}
