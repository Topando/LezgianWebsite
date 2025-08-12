'use client';

import styles from "./feedbackForm.module.css";

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import Inputmask from 'inputmask';
import { sendFeedback } from "@/shared/api/endpoints/feedback-form";

interface Props {
  title?: string;
  otherComment?: string;
}

export function FeedbackForm({title = 'Обратная связь', otherComment}: Props) {
  const cT = useTranslations('common');
  title = title === 'Обратная связь' ? cT('feedback'): title;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    comment: "",
    check: true,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.check) {
      setError("Необходимо согласиться с обработкой персональных данных.");
      return;
    }
    const payloadComment = otherComment
    ? `Запись на мероприятие:\n${otherComment}\nКомментарий:\n${formData.comment}`
    : formData.comment;

    try {
      const response = await sendFeedback(
        formData.name.trim(),
        formData.phone.trim(),
        formData.email.trim(),
        payloadComment.trim()
      );
      if (response) {
        setFormData({
          name: "",
          phone: "",
          email: "",
          comment: "",
          check: true,})
        setIsSubmitted(true);
      } else {
        setError("Не удалось отправить заявку. Попробуйте снова.");
      }
    } catch (err) {
      setError("Произошла ошибка. Попробуйте позже.");
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
          <p className={styles.title}>{title}</p>
          {error && <p className={styles.errorMessage}>{error}</p>}
          {isSubmitted ? (
            <div className={styles.successMessage}>
              <h2>Заявка отправлена</h2>
              <p>Мы свяжемся с вами в ближайшее время.</p>
            </div>
          ) : (<></>)}

          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.mainInputs}>
              <div className={styles.formElem}>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={cT('name')}
                />
              </div>

              <div className={styles.formElem}>
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
              </div>

              <div className={styles.formElem}>
                <input
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  placeholder={cT('message')}
                />
              </div>

              <div className={styles.formElem}>
                <p className={styles.placeholderPhone}>{cT('phone-num')}</p>
                <PhoneInput 
                  value={formData.phone} 
                  onChange={(phone) => setFormData(prev => ({...prev, phone}))} 
                />
              </div>
            </div>

            <div className={styles.checkBoxContainer}>
              <input
                type="checkbox"
                id="check"
                name="check"
                checked={formData.check}
                onChange={handleChange}
                className={styles.checkBox}
              />
              <label htmlFor="check" className={styles.labelCheckBox}>
                 {cT('conf-check')}
              </label>
            </div>

            <div className={styles.buttonSendContainer}>
              <button type="submit" className={styles.buttonSend}>
                {cT('send')}
              </button>
            </div>
          </form>
    </div>
  );
}



function PhoneInput({ value, onChange }: {
  value: string;
  onChange: (value: string) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState(value);
  const imRef = useRef<any>(null);

  useEffect(() => {
    if (ref.current && !imRef.current) {
      imRef.current = new Inputmask({
        mask: '+7 (999) 999-99-99',
        showMaskOnHover: false,
        clearIncomplete: true,
        autoUnmask: true,
        placeholder: '_',
        onincomplete: () => onChange(''),
      });
      imRef.current.mask(ref.current);
    }
    return () => {
      if (imRef.current) imRef.current.remove();
    };
  }, []);

  useEffect(() => {
    setInputValue(value || '');
    if (ref.current) {
      ref.current.value = value || '';

      const im = (ref.current as any).inputmask;
      if (im && typeof im.setValue === 'function') {
        im.setValue(value || '');
      }
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    const im = (ref.current as any)?.inputmask;
    const unmasked = im?.unmaskedvalue ? im.unmaskedvalue() : '';
    onChange(unmasked ? `+7${unmasked}` : '');
  };

  return (
    <input
      ref={ref}
      type="tel"
      inputMode="tel"
      value={inputValue}
      onChange={handleChange}
      placeholder="+7"
      required
      className={styles.input}
    />
  );
}
