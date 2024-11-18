import { useState, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './HealthLife.css';

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default function HealthLife() {
    const searchParams = useMemo(() => {
        return new URLSearchParams(window.location.search);
    }, [])

    const [markdownContent, setMarkdownContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMarkdown = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${apiBaseUrl}/chat/healthlife/?email=${searchParams?.get('email') ?? ''}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch markdown content');
                }
                const data = response?.body;

                setLoading(false);
                if (!data) {
                    alert(
                        'Something went wrong went fetching from the API. Make sure to use a valid API key.',
                    );
                    return;
                }

                const reader = data.getReader();
                const decoder = new TextDecoder();
                let done = false;

                while (!done) {
                    const { value, done: doneReading } = await reader.read();
                    done = doneReading;
                    const chunkValue = decoder.decode(value);
                    console.log(chunkValue)
                    setMarkdownContent((data) => data + chunkValue);
                }

            } catch (error) {
                console.error('Error fetching markdown:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMarkdown();
    }, [searchParams]);

    return <div className="healthlife-container">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{
            loading ? '...' : markdownContent}</ReactMarkdown>
    </div>;
}
