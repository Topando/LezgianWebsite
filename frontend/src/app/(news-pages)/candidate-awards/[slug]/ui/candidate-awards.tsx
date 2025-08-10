'use client'

import styles from './candidate-awards.module.css';
import { useState, useEffect } from "react";
import Image from "next/image";

import { AwardsDetailGet, AwardsDetailType, CandidateType, AwardsCandidateVote } from "@/shared/api/endpoints/awards";
import { replaceLocalhostWithBackend } from '@/features/makeRelativePath';
import { HtmlBlock } from '@/features/htmlBlock';

interface Props {
    slug: string;
}

export default function DetailPage({ slug }: Props) {
    const [data, setData] = useState<AwardsDetailType>();
    const [votedCandidateId, setVotedCandidateId] = useState<number | null>(null);

    // Загружаем данные голосования
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await AwardsDetailGet(slug);
                setData(response);
            } catch (err) {
                console.log(err);
            }
        };

        getData();
    }, [slug]);

    // Проверка cookie при заходе
    useEffect(() => {
        const votesCookie = document.cookie
            .split("; ")
            .find(row => row.startsWith("votes="))
            ?.split("=")[1];

        if (votesCookie) {
            try {
                const parsedVotes = JSON.parse(decodeURIComponent(votesCookie));
                if (parsedVotes[slug]) {
                    setVotedCandidateId(parsedVotes[slug]); // запоминаем, за кого голосовал
                }
            } catch (err) {
                console.error("Ошибка парсинга cookies голосов", err);
            }
        }
    }, [slug]);

    // Обновление cookie при голосовании
    const handleVote = async (candidate_id: number) => {
        try {
            const response = await AwardsCandidateVote(slug, candidate_id);
            if (response) {
                setVotedCandidateId(candidate_id);

                const votesCookie = document.cookie
                    .split("; ")
                    .find(row => row.startsWith("votes="))
                    ?.split("=")[1];

                let parsedVotes: Record<string, number> = {};
                if (votesCookie) {
                    try {
                        parsedVotes = JSON.parse(decodeURIComponent(votesCookie));
                    } catch {}
                }

                parsedVotes[slug] = candidate_id;

                document.cookie = `votes=${encodeURIComponent(JSON.stringify(parsedVotes))}; path=/; max-age=${60 * 60 * 24 * 365}`;
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {data ? (
                <div className={styles.container}>
                    <div className={styles.containerImg}>
                        <Image src={replaceLocalhostWithBackend(data.image)} width={680} height={360} alt={data.name} />
                    </div>

                    <div className={styles.containerText}>
                        <p className={styles.title}>{data.name}</p>
                        <HtmlBlock body={data.description} />
                    </div>

                    <div className={styles.candidateContainer}>
                        <div className={styles.header}>
                            <p className={styles.title}>Кандидаты</p>
                            <p className={styles.description}>Ознакомьтесь с участниками и сделайте выбор</p>
                        </div>

                        <div className={styles.candidateList}>
                            {data.candidates.map((elem, ind) => (
                                <CandidateElem
                                    data={elem}
                                    key={ind}
                                    onVote={handleVote}
                                    votedCandidateId={votedCandidateId}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
}

interface CandidateElemProps {
    data: CandidateType;
    onVote: (id: number) => void;
    votedCandidateId: number | null;
}

function CandidateElem({ data, onVote, votedCandidateId }: CandidateElemProps) {
    const isVoted = votedCandidateId === data.id;
    const isDisabled = votedCandidateId !== null && votedCandidateId !== data.id;

    return (
        <div className={styles.candidateElem}>
            <div className={styles.containerImg}>
                <Image src={replaceLocalhostWithBackend(data.photo)} width={240} height={240} alt={data.name} />
            </div>
            <div className={styles.candidateMainContent}>
                <p className={styles.title}>{data.name}</p>
                <p className={styles.description}>{data.description}</p>

                <button
                    onClick={() => onVote(data.id)}
                    disabled={isDisabled}
                    className={isVoted ? styles.active : ""}
                >
                    {isVoted ? "Выбран" : "Выбрать"}
                </button>
            </div>
        </div>
    );
}