import { useState, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
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
                const response = await fetch(`${apiBaseUrl}/chat/healthlife/?email=${searchParams?.get('email') ?? ''}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch markdown content');
                }
                const data = await response.text();
                setMarkdownContent(data);
            } catch (error) {
                console.error('Error fetching markdown:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMarkdown();
    }, [searchParams]);

    return loading ?
        <div>Loading...</div> :
        <div className="healthlife-container">
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>;
}
