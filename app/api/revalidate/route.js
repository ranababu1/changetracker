// app/api/revalidate/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const secret = request.nextUrl.searchParams.get('secret');

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 });
  }

  try {
    // Revalidate the pages
    await Promise.all([
      revalidatePath('/changelog'),
      revalidatePath('/timeline'),
    ]);

    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 });
  }
}
