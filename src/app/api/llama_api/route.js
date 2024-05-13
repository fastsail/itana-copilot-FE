import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req, res) {
    try {
        const url = new URL(req.url);
        const userMessage = url.searchParams.get('user_message');
        const maxTokens = url.searchParams.get('max_tokens')

        // Check if userMessage and maxTokens are provided
        if (!userMessage || !maxTokens) {
            throw new Error('userMessage and maxTokens are required parameters');
        }

        const response = await axios.get('https://llama-api-image-sbmzuuqa7a-uc.a.run.app/llama', {
            headers: {
                'Content-Type': 'application/json',
            },
            params: {
                user_message: userMessage,
                max_tokens: maxTokens,
            },
        });

        return NextResponse.json(response.data); // Send response data
    } catch (error) {
        console.error('Error fetching note:', error);
        return NextResponse.json({ message: 'Invalid user_message' }, { status: 400 });
    }
}