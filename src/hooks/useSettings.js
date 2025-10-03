import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { settingsAPI } from "../services/settings";

// --- 1. Admin Settings ---

// Fetch Admin Settings
export const useAdminSetting = () => {
  return useQuery({
    queryKey: ["settings", "admin"],
    queryFn: settingsAPI.getAdminSetting,
  });
};

// Edit/Update Admin Settings
export const useEditAdminSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => settingsAPI.editAdminSetting(data),
    onSuccess: () => {
      // Invalidate the specific admin setting key
      queryClient.invalidateQueries({ queryKey: ["settings", "admin"] });
    },
  });
};

// -------------------------------------------------------------------------

// --- 2. Theme Settings ---

// Fetch Theme Settings
export const useThemeSetting = () => {
  return useQuery({
    queryKey: ["settings", "theme"],
    queryFn: settingsAPI.getThemeSetting,
  });
};

// Edit/Update Theme Settings
export const useEditThemeSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => settingsAPI.editThemeSetting(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings", "theme"] });
    },
  });
};

// -------------------------------------------------------------------------

// --- 3. Business Address Settings ---

// Fetch Business Address
export const useBusinessAddress = () => {
  return useQuery({
    queryKey: ["settings", "business-address"],
    queryFn: settingsAPI.getBusinessAddress,
  });
};

// Edit/Update Business Address
export const useEditBusinessAddress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => settingsAPI.editBusinessAddress(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["settings", "business-address"],
      });
    },
  });
};

// -------------------------------------------------------------------------

// --- 4. Company Settings ---

// Fetch Company Settings
export const useCompanySetting = () => {
  return useQuery({
    queryKey: ["settings", "company"],
    queryFn: settingsAPI.getCompanySetting,
  });
};

// Edit/Update Company Settings
export const useEditCompanySetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => settingsAPI.editCompanySetting(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings", "company"] });
    },
  });
};

// -------------------------------------------------------------------------

// --- 5. Security Settings ---

// Fetch Security Settings
export const useSecuritySetting = () => {
  return useQuery({
    queryKey: ["settings", "security"],
    queryFn: settingsAPI.getSecuritySetting,
  });
};

// Edit/Update Security Settings
export const useEditSecuritySetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => settingsAPI.editSecuritySetting(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings", "security"] });
    },
  });
};
