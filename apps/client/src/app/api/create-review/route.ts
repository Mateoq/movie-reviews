import { NextResponse } from 'next/server';
import axios from 'axios';

import { CreateReviewData } from '../../types';

export async function POST(req: Request) {
  const { SERVICES_HOST, SERVICES_PORT } = process.env;
  const url = `${SERVICES_HOST}:${SERVICES_PORT}/reviews`;
  const data = await req.json() as CreateReviewData;

  if (!data.movieId || !data.rating || !data.username) {
    return NextResponse.json({ result: false });
  }

  const review = await axios.post(url, data);

  return NextResponse.json({ result: true, data });
}
