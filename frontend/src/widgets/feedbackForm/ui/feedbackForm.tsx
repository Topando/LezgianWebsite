'use client';

import styles from "./feedbackForm.module.css";

import { useEffect, useRef, useState } from 'react';
import Inputmask from 'inputmask';
// import { sendFeedback } from "@/shared/api/endpoints/feedback-form";

export function FeedbackForm() {
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
    console.log(formData.phone);

    // try {
    //   const response = await sendFeedback(
    //     formData.phone,
    //     formData.name,
    //     formData.comment
    //   );
    //   if (response) {
    //     setIsSubmitted(true);
    //   } else {
    //     setError("Не удалось отправить заявку. Попробуйте снова.");
    //   }
    // } catch (err) {
    //   setError("Произошла ошибка. Попробуйте позже.");
    //   console.error(err);
    // }
  };

  return (
    <div className={styles.container}>
          <p className={styles.title}>Обратная связь</p>
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
                  placeholder="Имя"
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
                  placeholder="Сообщение"
                />
              </div>

              <div className={styles.formElem}>
                <p className={styles.placeholderPhone}>Номер телефона</p>
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
                «Я согласен(а) с политикой обработки персональных данных»
              </label>
            </div>

            <div className={styles.buttonSendContainer}>
              <button type="submit" className={styles.buttonSend}>
                Отправить
              </button>
            </div>
          </form>
    </div>
  );
}



function PhoneInput({ value, onChange }: { 
  value: string; 
  onChange: (value: string) => void 
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
        onincomplete: () => {
          // Обработка неполного ввода
          onChange('');
        }
      });
      
      imRef.current.mask(ref.current);

      // Инициализация значения
      if (value) {
        ref.current.value = value;
      }
    }

    return () => {
      if (imRef.current) {
        imRef.current.remove();
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (imRef.current) {
      const unmasked = imRef.current.unmaskedvalue(value);
      onChange(unmasked ? `+7${unmasked}` : '');
    }
  };

  return (
    <input
      ref={ref}
      type="tel"
      value={inputValue}
      onChange={handleChange}
      placeholder="+7"
      required
      className={styles.input}
    />
  );
}