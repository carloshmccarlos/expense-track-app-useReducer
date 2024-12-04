export function LanguageChoice({ onSetLanguage, language }) {
    return (
        <select
            className={'language-choice'}
            onChange={e => onSetLanguage(e.target.value)}
            value={language}
        >
            <option value="english">English</option>
            <option value="chinese">中文</option>
        </select>
    );
}
