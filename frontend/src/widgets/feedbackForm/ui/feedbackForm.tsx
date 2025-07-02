import styles from "./feedbackForm.module.css";
import React, { useState } from "react";
//import { sendFeedback } from "@/shared/api/endpoints/feedback-form";

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

    /*try {
      const response = await sendFeedback(
        formData.phone,
        formData.name,
        formData.comment + `\nОтветы на вопросы:\n${details}`
      );

      if (response) {
        setIsSubmitted(true);
      } else {
        setError("Не удалось отправить заявку. Попробуйте снова.");
      }
    } catch (err) {
      setError("Произошла ошибка. Попробуйте позже.");
      console.error(err);
    }*/
  };

  return (
    <div className={styles.container}>
      {isSubmitted ? (
        <div className={styles.successMessage}>
          <h2>Заявка отправлена</h2>
          <p>Мы свяжемся с вами в ближайшее время.</p>
        </div>
      ) : (
        <>
          <p className={styles.title}>Обратная связь</p>
          {error && <p className={styles.errorMessage}>{error}</p>}

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
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Телефон"
                        required
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
              <label htmlFor="check" className={styles.labelCheckBox}>«Я согласен(а) с политикой обработки персональных данных»</label>
            </div>
            
            <div className={styles.buttonSendContainer}>
                <button type="submit" className={styles.buttonSend}>Отправить</button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}