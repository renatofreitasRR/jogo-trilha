"use client";
import Link from 'next/link';
import styles from '../../styles.module.css';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import ConfirmaCompraSuspense from './component';

const ConfirmaCompra: React.FC = () => {
    const searchParams = useSearchParams();

    return (
        <Suspense>
            <ConfirmaCompraSuspense searchParams={searchParams} />
        </Suspense>
    );
};

export default ConfirmaCompra;
