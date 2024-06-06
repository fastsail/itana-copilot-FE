export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req, res) {
    const searchParams = req.nextUrl.searchParams;
    try {
        const url = new URL(req.nextUrl);
        const userMessage = url.searchParams.get('user_message');
        const maxTokens = url.searchParams.get('max_tokens');

        // Check if userMessage and maxTokens are provided
        if (!userMessage || !maxTokens) {
            throw new Error('userMessage and maxTokens are required parameters');
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_LLAMA_API_URL}`, {
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
        const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
        return NextResponse.json({ message: errorMessage }, { status: 400 });
    }
}