const RenderTopicSubmissions = (item: any) => {
  const topicSubmissions = item?.topic_submissions;

  if (!topicSubmissions || typeof topicSubmissions !== "object") {
    return null;
  }

  const tags = Object.keys(topicSubmissions).join(", ");

  return (
    <span key={tags} className="text-sm text-gray-600">
      {tags}
    </span>
  );
};

export default RenderTopicSubmissions;
