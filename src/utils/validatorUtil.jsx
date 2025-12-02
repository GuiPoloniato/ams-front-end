export const validationRules = {
  required: (value, fieldName) => {
    if (!value || !value.toString().trim()) {
      return `${fieldName} é obrigatório`;
    }
    return null;
  },

  minLength: (min) => (value, fieldName) => {
    if (value && value.length < min) {
      return `${fieldName} deve ter pelo menos ${min} caracteres`;
    }
    return null;
  },

  maxLength: (max) => (value, fieldName) => {
    if (value && value.length > max) {
      return `${fieldName} deve ter no máximo ${max} caracteres`;
    }
    return null;
  },

  email: (value, fieldName) => {
    if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return `${fieldName} inválido`;
    }
    return null;
  },

  cpf: (value, fieldName) => {
    const cleanCpf = value?.replace(/\D/g, '');
    if (cleanCpf && cleanCpf.length !== 11) {
      return `${fieldName} deve ter 11 dígitos`;
    }
    return null;
  },

  phone: (value, fieldName) => {
    const cleanPhone = value?.replace(/\D/g, '');
    if (cleanPhone && (cleanPhone.length < 10 || cleanPhone.length > 11)) {
      return `${fieldName} inválido`;
    }
    return null;
  },

  cep: (value, fieldName) => {
    const cleanCep = value?.replace(/\D/g, '');
    if (cleanCep && cleanCep.length !== 8) {
      return `${fieldName} deve ter 8 dígitos`;
    }
    return null;
  },

  numbersOnly: (value, fieldName) => {
    if (value && !/^\d+$/.test(value)) {
      return `${fieldName} deve conter apenas números`;
    }
    return null;
  },

  date: (value, fieldName) => {
    if (value) {
      const date = new Date(value);
      const today = new Date();
      if (date > today) {
        return `${fieldName} não pode ser futura`;
      }
    }
    return null;
  }
};

export const estudanteValidationSchema = {
  matricula: [
    validationRules.required,
    validationRules.numbersOnly
  ],
  nome: [
    validationRules.required,
    validationRules.minLength(3)
  ],
  nascimento: [
    validationRules.required,
    validationRules.date
  ],
  naturalidade: [
    validationRules.required
  ],
  raca: [
    validationRules.required
  ],
  turno: [
    validationRules.required
  ],
  cep: [
    validationRules.required,
    validationRules.cep
  ],
  bairro: [
    validationRules.required
  ],
  logradouro: [
    validationRules.required
  ],
  numero: [
    validationRules.required
  ],
  pais: [
    validationRules.required
  ],
  uf: [
    validationRules.required
  ],
  cidade: [
    validationRules.required
  ],
  nomeResponsavel: [
    validationRules.required
  ],
  cpfResponsavel: [
    validationRules.required,
    validationRules.cpf
  ],
  rgResponsavel: [
    validationRules.required
  ],
  celular: [
    validationRules.required,
    validationRules.phone
  ],
  email: [
    validationRules.required,
    validationRules.email
  ],
  parentesco: [
    validationRules.required
  ]
};

export const validateForm = (formData, schema) => {
  const errors = {};
  
  Object.keys(schema).forEach(field => {
    const rules = schema[field];
    const value = formData[field];
    const fieldLabel = formatFieldLabel(field);
    
    // Executa todas as regras do campo
    for (const rule of rules) {
      const error = rule(value, fieldLabel);
      if (error) {
        errors[field] = error;
        break;
      }
    }
  });
  
  return errors;
};

const formatFieldLabel = (field) => {
  const labels = {
    matricula: 'Matrícula',
    nome: 'Nome',
    nascimento: 'Data de nascimento',
    naturalidade: 'Naturalidade',
    raca: 'Raça',
    turno: 'Turno',
    cep: 'CEP',
    bairro: 'Bairro',
    logradouro: 'Logradouro',
    numero: 'Número',
    pais: 'País',
    uf: 'Estado',
    cidade: 'Cidade',
    nomeResponsavel: 'Nome do responsável',
    cpfResponsavel: 'CPF do responsável',
    rgResponsavel: 'RG do responsável',
    celular: 'Celular',
    email: 'Email',
    parentesco: 'Parentesco',
    telefone: 'Telefone',
    cpf: 'CPF'
  };
  
  return labels[field] || field;
};

export const validateField = (field, value, schema) => {
  const rules = schema[field];
  if (!rules) return null;
  
  const fieldLabel = formatFieldLabel(field);
  
  for (const rule of rules) {
    const error = rule(value, fieldLabel);
    if (error) return error;
  }
  
  return null;
};

export const formatters = {
  cep: (value) => {
    const clean = value.replace(/\D/g, '');
    if (clean.length <= 8) {
      return clean.replace(/(\d{5})(\d)/, '$1-$2');
    }
    return clean.slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2');
  },

  phone: (value) => {
    const clean = value.replace(/\D/g, '');
    if (clean.length <= 11) {
      if (clean.length <= 10) {
        return clean.replace(/(\d{2})(\d{4})(\d)/, '($1) $2-$3');
      }
      return clean.replace(/(\d{2})(\d{5})(\d)/, '($1) $2-$3');
    }
    return clean.slice(0, 11).replace(/(\d{2})(\d{5})(\d)/, '($1) $2-$3');
  },

  cpf: (value) => {
    const clean = value.replace(/\D/g, '');
    if (clean.length <= 11) {
      return clean.replace(/(\d{3})(\d{3})(\d{3})(\d)/, '$1.$2.$3-$4');
    }
    return clean.slice(0, 11).replace(/(\d{3})(\d{3})(\d{3})(\d)/, '$1.$2.$3-$4');
  }
};

export const estadosBrasil = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' }
];

export const professorValidationSchema = {
  nome: [validationRules.required, validationRules.minLength(3)],
  formacao: [validationRules.required, validationRules.minLength(3)],
  telefone: [validationRules.required, validationRules.phone],
  email: [validationRules.required, validationRules.email],
  cep: [validationRules.required, validationRules.cep],
  bairro: [validationRules.required],
  logradouro: [validationRules.required],
  numero: [validationRules.required],
  pais: [validationRules.required],
  uf: [validationRules.required],
  cidade: [validationRules.required]
};