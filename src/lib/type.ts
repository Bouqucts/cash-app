export interface usersTypes {
    id: string,
    name: string,
    email: string,
    password: string,
    updated_at: string,
    created_at: string,
};

export interface categoriesProps {
    id: string,
    user_id: string,
    name: string,
    updated_at: string,
    created_at: string,
};

export interface transactionsProps {
    id: string,
    category_id: string,
    name: string,
    amount: number,
    type: string,
    updated_at: string,
    created_at: string,
};

export interface debtProps {
    id: string,
    user_id: string,
    name: string,
    duedate: number,
    notification: string,
    updated_at: string,
    created_at: string,
};

export interface walletProps {
    id: string,
    user_id: string,
    name: string,
    balance: string,
    type: string,
    updated_at: string,
    created_at: string,
}

export interface payloadProps {
    id: string,
    name: string,
    email: string,
    created_at: string,
    updated_at: string,
};

export interface userProps {
    id: string,
    name: string,
    email: string,
    updated_at: string,
    created_at: string,
}