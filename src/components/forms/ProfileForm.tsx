"use client";

import { useState, useId } from "react";
import { Shield, ChevronLeft, ArrowRight, CheckCircle2, Loader2, Sparkles, MapPin } from "lucide-react";
import styles from "./ProfileForm.module.css";

const STATES = ["Andhra Pradesh", "Telangana"];
const DISTRICTS: Record<string, string[]> = {
  "Andhra Pradesh": [
    "Alluri Sitharama Raju", "Anakapalli", "Anantapur", "Annamayya", "Bapatla", "Chittoor", "Dr. B.R. Ambedkar Konaseema", "East Godavari", "Eluru", "Guntur", "Kakinada", "Krishna", "Kurnool", "Nandyal", "NTR", "Palnadu", "Parvathipuram Manyam", "Prakasam", "Sri Potti Sriramulu Nellore", "Sri Sathya Sai", "Srikakulam", "Tirupati", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"
  ],
  "Telangana": [
    "Adilabad", "Bhadradri Kothagudem", "Hanamkonda", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Komaram Bheem Asifabad", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal-Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Ranga Reddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal", "Yadadri Bhuvanagiri"
  ]
};

type FormStep = "details" | "location" | "success";

interface ProfileFormProps {
  variant?: "hero" | "secondary";
  id?: string;
}

interface FormData {
  name: string;
  gender: string;
  looking_for: string;
  phone: string;
  country: string;
  state: string;
  district: string;
  city: string;
}

interface FormErrors {
  name?: string;
  gender?: string;
  looking_for?: string;
  phone?: string;
  state?: string;
  district?: string;
  city?: string;
}

export default function ProfileForm({ variant = "hero", id }: ProfileFormProps) {
  const uid = useId();
  const formId = id || uid;

  const [step, setStep] = useState<FormStep>("details");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    gender: "",
    looking_for: "",
    phone: "",
    country: "India",
    state: "",
    district: "",
    city: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [apiError, setApiError] = useState("");

  const validateDetails = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      newErrors.name = "Please enter your full name (at least 2 characters).";
    }
    if (!formData.gender) newErrors.gender = "Please select your gender.";
    if (!formData.looking_for) newErrors.looking_for = "Please select looking for.";
    if (!formData.phone || !/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit Indian mobile number.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLocation = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.state) {
      newErrors.state = "Please select a state.";
    }
    if (!formData.district) {
      newErrors.district = "Please select a district.";
    }
    if (!formData.city.trim() || formData.city.trim().length < 2) {
      newErrors.city = "Please enter your city/town.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextToLocation = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateDetails()) {
      setStep("location");
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLocation()) return;
    setLoading(true);
    setApiError("");

    try {
      const res = await fetch("/api/profiles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!data.success) {
        setApiError(data.message);
        setLoading(false);
        return;
      }
      setStep("success");
    } catch {
      setApiError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isHero = variant === "hero";

  const renderProgress = (currentStage: 1 | 2 | 3 | 4) => {
    const stages = [
      { id: 1, label: "Details" },
      { id: 2, label: "Location" },
      { id: 3, label: "Review" },
      { id: 4, label: "Match" }
    ];
    return (
      <div className={styles.progressContainer} aria-label="Registration Progress">
        <div className={styles.progressTrack} />
        <div
          className={styles.progressFill}
          style={{ width: `${((currentStage - 1) / (stages.length - 1)) * 100}%` }}
        />
        {stages.map((st) => (
          <div
            key={st.id}
            className={`${styles.step} ${st.id <= currentStage ? styles.active : ""}`}
          >
            <div className={styles.stepCircle}>
              {st.id < currentStage ? <CheckCircle2 size={12} strokeWidth={3} /> : st.id}
            </div>
            <span className={styles.stepLabel}>{st.label}</span>
          </div>
        ))}
      </div>
    );
  };

  if (step === "success") {
    return (
      <div className={`${styles.form} ${isHero ? styles.hero : styles.secondary}`} id={formId}>
        <div className={styles.formHeader}>
          {renderProgress(3)}
          <h2 className={styles.formTitle}>Profile Registered!</h2>
          <p className={styles.formSubtitle}>Your details have been successfully submitted.</p>
        </div>

        <div className={styles.successBody}>
          <div className={styles.journeyCard}>
            <div className={styles.journeyStep}>
              <div className={`${styles.journeyBadge} ${styles.badgeProgress}`}>Stage 3</div>
              <h3 className={styles.journeyTitle}>Personal Review in Progress</h3>
              <p className={styles.journeyDesc}>
                Founder Chettimala Rama Chandra Rao is personally reviewing your requirements to find matching profiles.
              </p>
            </div>
            <div className={styles.journeyStep}>
              <div className={`${styles.journeyBadge} ${styles.badgePending}`}>Stage 4</div>
              <h3 className={styles.journeyTitle}>Suitable Matchmaking</h3>
              <p className={styles.journeyDesc}>
                Once approved, we will reach out to you directly via phone or WhatsApp with compatible partner recommendations.
              </p>
            </div>
          </div>

          <div className={styles.successFooter}>
            <Sparkles className={styles.successSparkle} size={18} />
            <span>We will reach out to <strong>+91 {formData.phone}</strong> soon.</span>
          </div>
        </div>
      </div>
    );
  }

  if (step === "location") {
    return (
      <div className={`${styles.form} ${isHero ? styles.hero : styles.secondary}`} id={formId}>
        <div className={styles.formHeader}>
          {renderProgress(2)}
          <button
            className={styles.backBtn}
            onClick={() => { setStep("details"); setErrors({}); setApiError(""); }}
            aria-label="Go back to profile details"
          >
            <ChevronLeft size={16} />
            <span>Back to Details</span>
          </button>
          <h2 className={styles.formTitle}>Where are you from?</h2>
          <p className={styles.formSubtitle}>Help us find matches in your preferred location.</p>
        </div>

        <form onSubmit={handleFinalSubmit} className={styles.formBody} noValidate>
          {/* Country */}
          <div className="form-group">
            <label htmlFor={`${formId}-country`} className="form-label">Country</label>
            <input
              id={`${formId}-country`}
              type="text"
              className="form-input"
              value={formData.country}
              disabled
              readOnly
            />
          </div>

          {/* State */}
          <div className="form-group">
            <label htmlFor={`${formId}-state`} className="form-label">State</label>
            <div className="form-select-wrapper">
              <select
                id={`${formId}-state`}
                className={`form-select ${errors.state ? "error" : ""}`}
                value={formData.state}
                onChange={(e) => {
                  setFormData({ ...formData, state: e.target.value, district: "" });
                  if (errors.state) setErrors({ ...errors, state: undefined });
                }}
              >
                <option value="">Select State</option>
                {STATES.map(state => <option key={state} value={state}>{state}</option>)}
              </select>
            </div>
            {errors.state && <p className="form-error">{errors.state}</p>}
          </div>

          {/* District */}
          <div className="form-group">
            <label htmlFor={`${formId}-district`} className="form-label">District</label>
            <div className="form-select-wrapper">
              <select
                id={`${formId}-district`}
                className={`form-select ${errors.district ? "error" : ""}`}
                value={formData.district}
                onChange={(e) => {
                  setFormData({ ...formData, district: e.target.value });
                  if (errors.district) setErrors({ ...errors, district: undefined });
                }}
                disabled={!formData.state}
              >
                <option value="">Select District</option>
                {formData.state && DISTRICTS[formData.state]?.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
            {errors.district && <p className="form-error">{errors.district}</p>}
          </div>

          {/* City */}
          <div className="form-group">
            <label htmlFor={`${formId}-city`} className="form-label">City / Town</label>
            <input
              id={`${formId}-city`}
              type="text"
              className={`form-input ${errors.city ? "error" : ""}`}
              placeholder="Enter your city or town"
              value={formData.city}
              onChange={(e) => {
                setFormData({ ...formData, city: e.target.value });
                if (errors.city) setErrors({ ...errors, city: undefined });
              }}
            />
            {errors.city && <p className="form-error">{errors.city}</p>}
          </div>

          {apiError && <div className="alert alert-error">{apiError}</div>}

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            disabled={loading}
            style={{ width: "100%", marginTop: "8px" }}
          >
            {loading ? (
              <><Loader2 className="spinner" size={18} /><span>Submitting…</span></>
            ) : (
              <><span>Submit Registration</span><ArrowRight size={18} /></>
            )}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className={`${styles.form} ${isHero ? styles.hero : styles.secondary}`} id={formId}>
      <div className={styles.formHeader}>
        {renderProgress(1)}
        <h2 className={styles.formTitle}>Create your profile</h2>
        <p className={styles.formSubtitle}>It only takes about 2 minutes.</p>
      </div>

      <form onSubmit={handleNextToLocation} className={styles.formBody} noValidate>
        <div className="form-group">
          <label htmlFor={`${formId}-name`} className="form-label">Your name</label>
          <input
            id={`${formId}-name`}
            type="text"
            className={`form-input ${errors.name ? "error" : ""}`}
            placeholder="Enter your full name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: undefined });
            }}
          />
          {errors.name && <p className="form-error">{errors.name}</p>}
        </div>

        <div className={styles.twoCol}>
          <div className="form-group">
            <label htmlFor={`${formId}-gender`} className="form-label">I am</label>
            <div className="form-select-wrapper">
              <select
                id={`${formId}-gender`}
                className={`form-select ${errors.gender ? "error" : ""}`}
                value={formData.gender}
                onChange={(e) => {
                  setFormData({ ...formData, gender: e.target.value });
                  if (errors.gender) setErrors({ ...errors, gender: undefined });
                }}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {errors.gender && <p className="form-error">{errors.gender}</p>}
          </div>

          <div className="form-group">
            <label htmlFor={`${formId}-looking`} className="form-label">Looking for</label>
            <div className="form-select-wrapper">
              <select
                id={`${formId}-looking`}
                className={`form-select ${errors.looking_for ? "error" : ""}`}
                value={formData.looking_for}
                onChange={(e) => {
                  setFormData({ ...formData, looking_for: e.target.value });
                  if (errors.looking_for) setErrors({ ...errors, looking_for: undefined });
                }}
              >
                <option value="">Select</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Either">Either</option>
              </select>
            </div>
            {errors.looking_for && <p className="form-error">{errors.looking_for}</p>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor={`${formId}-phone`} className="form-label">Mobile number</label>
          <div className={`phone-input-wrapper ${errors.phone ? "error" : ""}`}>
            <span className="phone-prefix">+91</span>
            <input
              id={`${formId}-phone`}
              type="tel"
              maxLength={10}
              className="phone-input"
              placeholder="10-digit mobile number"
              value={formData.phone}
              onChange={(e) => {
                const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                setFormData({ ...formData, phone: val });
                if (errors.phone) setErrors({ ...errors, phone: undefined });
              }}
            />
          </div>
          {errors.phone && <p className="form-error">{errors.phone}</p>}
        </div>

        <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%", marginTop: "8px" }}>
          <span>Continue</span>
          <ArrowRight size={18} />
        </button>

        <p className={styles.privacy}>
          <Shield size={13} className={styles.privacyIcon} />
          <span>Details are strictly private and only shared with the authorized matchmaking team.</span>
        </p>
      </form>
    </div>
  );
}
