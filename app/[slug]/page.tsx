"use client";

import React, { useEffect, useState } from "react";

interface ShortlinkPageProps {
  params: {
    slug: string;
  };
}

async function getShortLink(slug: string, token: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_LINKS_SERVICES}/links/${slug}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!res.ok) return null;

    return await res.json();
  } catch (err) {
    console.error("Error fetching shortlink:", err);
    return null;
  }
}

export default function ShortlinkPage({ params }: ShortlinkPageProps) {
  const { slug } = params;
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt_token");
    if (!token) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    getShortLink(slug, token).then((data) => {
      if (!data?.data?.url) {
        setNotFound(true);
      } else {
        // redirect ke URL tujuan
        window.location.href = data.data.url;
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (notFound) return <div className="flex justify-center items-center h-screen">Link not found</div>;

  return null;
}
