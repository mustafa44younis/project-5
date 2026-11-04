import { useState, useEffect } from 'react';
import { messagesService } from '../services/messages.service';

export function useMessages() {
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const response = await messagesService.getMessages();
      if (response.success) {
        setMessages(response.data);
        setUnreadCount(response.data.filter(m => !m.read).length);
      }
    } catch (err) {
      setError(err.message || 'حدث خطأ في جلب الرسائل');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const sendMessage = async (content, receiverId) => {
    try {
      const response = await messagesService.sendMessage(content, receiverId);
      if (response.success) {
        setMessages(prev => [...prev, response.data]);
        return response;
      }
    } catch (err) {
      setError(err.message || 'حدث خطأ في إرسال الرسالة');
      throw err;
    }
  };

  return { messages, unreadCount, isLoading, error, refetch: fetchMessages, sendMessage };
}
