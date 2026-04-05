import React from 'react';
import ReactMarkdown from 'react-markdown';

const FormattedResponse = ({ content }) => {
  if (!content) return null;

  // Sometimes the model might return a JSON string like "```json ... ```" or just "{ ... }".
  // Let's try to parse if it's purely JSON.
  let parsedContent = content;
  try {
    const jsonStr = content.replace(/```json/g, '').replace(/```/g, '').trim();
    if (jsonStr.startsWith('{') || jsonStr.startsWith('[')) {
      const jsonObj = JSON.parse(jsonStr);
      // If it's pure JSON, we map keys to Markdown.
      parsedContent = objToMarkdown(jsonObj);
    }
  } catch (e) {
    // Not valid JSON, ignore and treat as standard markdown text
  }

  return (
    <div className="formatted-response">
      <ReactMarkdown>{parsedContent}</ReactMarkdown>
    </div>
  );
};

const objToMarkdown = (obj, depth = 1) => {
  if (typeof obj === 'string') return obj;
  if (Array.isArray(obj)) {
    return obj.map(item => `- ${typeof item === 'object' ? objToMarkdown(item, depth + 1) : item}`).join('\n');
  }
  return Object.entries(obj).map(([key, value]) => `**${key}:** ${typeof value === 'object' ? '\n' + objToMarkdown(value, depth + 1) : value}`).join('\n\n');
};

export default FormattedResponse;
