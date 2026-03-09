import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get('image');

        if (!file) {
            return NextResponse.json({ error: 'No image uploaded' }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Save to public/uploads
        const uploadDir = path.join(process.cwd(), 'public', 'uploads');
        try {
            await fs.access(uploadDir);
        } catch {
            await fs.mkdir(uploadDir, { recursive: true });
        }

        const filename = `${Date.now()}-${file.name}`;
        const filepath = path.join(uploadDir, filename);

        await fs.writeFile(filepath, buffer);

        // Determine base URL dynamically or use absolute path
        const fileUrl = `/uploads/${filename}`;

        return NextResponse.json({ url: fileUrl, filename });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
